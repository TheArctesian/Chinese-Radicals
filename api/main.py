#!/usr/bin/env python3
"""
Chinese Radical Analysis API

A FastAPI server that analyzes Chinese characters and returns their radical components
with meanings and decomposition information.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import json
import unicodedata
import re

app = FastAPI(title="Chinese Radical Analysis API", version="1.0.0")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load radical data
try:
    with open('data/radicals.json', 'r', encoding='utf-8') as f:
        RADICALS_DATA = json.load(f)
except FileNotFoundError:
    RADICALS_DATA = {}

try:
    with open('data/character_radicals.json', 'r', encoding='utf-8') as f:
        CHARACTER_RADICALS = json.load(f)
except FileNotFoundError:
    CHARACTER_RADICALS = {}

class RadicalInfo(BaseModel):
    radical: str
    pinyin: str
    english: str
    variant: Optional[str] = None
    stroke_count: Optional[int] = None
    position: Optional[str] = None

class CharacterAnalysis(BaseModel):
    character: str
    unicode_point: str
    radicals: List[RadicalInfo]
    primary_radical: Optional[RadicalInfo] = None
    decomposition: Optional[str] = None

class AnalysisRequest(BaseModel):
    text: str

class AnalysisResponse(BaseModel):
    input_text: str
    characters: List[CharacterAnalysis]
    total_characters: int

def get_unicode_radical(char: str) -> Optional[str]:
    """Get the Unicode radical property for a character."""
    try:
        # Get the character's Unicode data
        name = unicodedata.name(char, None)
        if name and 'CJK' in name:
            # Use Unicode database to find radical
            # This is a simplified approach - in production, use proper CJK decomposition
            return None
    except:
        return None

def analyze_character(char: str) -> CharacterAnalysis:
    """Analyze a single Chinese character for its radical components."""
    unicode_point = f"U+{ord(char):04X}"
    
    # Check if we have decomposition data for this character
    radicals = []
    primary_radical = None
    decomposition = None
    
    if char in CHARACTER_RADICALS:
        radical_data = CHARACTER_RADICALS[char]
        
        # Get primary radical
        if 'primary_radical' in radical_data and radical_data['primary_radical'] in RADICALS_DATA:
            primary_data = RADICALS_DATA[radical_data['primary_radical']]
            primary_radical = RadicalInfo(
                radical=radical_data['primary_radical'],
                pinyin=primary_data.get('pinyin', ''),
                english=primary_data.get('english', ''),
                variant=primary_data.get('variant'),
                stroke_count=primary_data.get('stroke_count'),
                position='primary'
            )
            radicals.append(primary_radical)
        
        # Get component radicals
        if 'components' in radical_data:
            for component in radical_data['components']:
                if component in RADICALS_DATA:
                    comp_data = RADICALS_DATA[component]
                    radicals.append(RadicalInfo(
                        radical=component,
                        pinyin=comp_data.get('pinyin', ''),
                        english=comp_data.get('english', ''),
                        variant=comp_data.get('variant'),
                        stroke_count=comp_data.get('stroke_count'),
                        position='component'
                    ))
        
        decomposition = radical_data.get('decomposition')
    
    # Fallback: try to find any radical that might be in the character
    if not radicals:
        for radical, radical_info in RADICALS_DATA.items():
            if radical in char or (radical_info.get('variant') and radical_info['variant'] in char):
                radicals.append(RadicalInfo(
                    radical=radical,
                    pinyin=radical_info.get('pinyin', ''),
                    english=radical_info.get('english', ''),
                    variant=radical_info.get('variant'),
                    stroke_count=radical_info.get('stroke_count'),
                    position='detected'
                ))
                if not primary_radical:
                    primary_radical = radicals[-1]
    
    return CharacterAnalysis(
        character=char,
        unicode_point=unicode_point,
        radicals=radicals,
        primary_radical=primary_radical,
        decomposition=decomposition
    )

def is_chinese_character(char: str) -> bool:
    """Check if a character is a Chinese character."""
    code = ord(char)
    # CJK Unified Ideographs
    if 0x4E00 <= code <= 0x9FFF:
        return True
    # CJK Extension A
    if 0x3400 <= code <= 0x4DBF:
        return True
    # CJK Extension B and beyond
    if 0x20000 <= code <= 0x2A6DF:
        return True
    return False

@app.get("/")
async def root():
    return {"message": "Chinese Radical Analysis API", "version": "1.0.0"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_text(request: AnalysisRequest):
    """Analyze Chinese text and return radical decomposition for each character."""
    text = request.text.strip()
    
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    if len(text) > 100:
        raise HTTPException(status_code=400, detail="Text too long (max 100 characters)")
    
    characters = []
    for char in text:
        if is_chinese_character(char):
            analysis = analyze_character(char)
            characters.append(analysis)
    
    if not characters:
        raise HTTPException(status_code=400, detail="No Chinese characters found in input")
    
    return AnalysisResponse(
        input_text=text,
        characters=characters,
        total_characters=len(characters)
    )

@app.get("/radicals")
async def get_all_radicals():
    """Get all available radicals with their information."""
    return RADICALS_DATA

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)