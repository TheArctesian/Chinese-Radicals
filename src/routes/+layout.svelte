<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="main-container">
	<div class="footer m-auto gap-4">
		<div class="seal m-auto">
			<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
				<rect
					width="36"
					height="36"
					x="2"
					y="2"
					fill="none"
					stroke="#7d604c"
					stroke-width="1"
					rx="2"
				/>
				<path
					d="M10,20 C10,14 15,10 20,10 C25,10 30,14 30,20 C30,26 25,30 20,30 C15,30 10,26 10,20 Z"
					fill="none"
					stroke="#7d604c"
					stroke-width="1"
				/>
				<path d="M20,10 L20,30 M10,20 L30,20" stroke="#7d604c" stroke-width="1" />
			</svg>
		</div>
		<div class="divider m-auto"></div>
		<h1 class="m-auto justify-center text-center">
			<span class="link-group">
				<span class="icon-wrapper">
					<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						/>
						<path
							d="M12,7V12L15,15"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
				Created by&nbsp;<a href="https://www.stephenokita.com">Stephen Okita</a>
			</span>
			<span class="separator">|</span>
			<span class="link-group">
				<span class="icon-wrapper">
					<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10,2L8,4H4C2.9,4 2,4.9 2,6V18C2,19.1 2.9,20 4,20H20C21.1,20 22,19.1 22,18V6C22,4.9 21.1,4 20,4H16L14,2H10Z"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						/>
						<path
							d="M12,9L9,13H15L12,17"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
				Code can be found&nbsp;
				<a href="https://github.com/TheArctesian/Chinese-Radicals.git">here</a>
			</span>
			<span class="separator">|</span>
			<span class="link-group">
				<span class="icon-wrapper">
					<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						/>
						<path
							d="M7,7H17M7,12H17M7,17H14"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>
				</span>
				A printable pdf of this table can be found&nbsp;
				<a href="stephenokita-chinese-radicls.pdf">here</a>
			</span>
		</h1>
	</div>

	<div class="content">
		{@render children()}
	</div>
	<footer class="footer">
		<div class="seal">
			<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
				<rect
					width="36"
					height="36"
					x="2"
					y="2"
					fill="none"
					stroke="#7d604c"
					stroke-width="1"
					rx="2"
				/>
				<path
					d="M10,20 C10,14 15,10 20,10 C25,10 30,14 30,20 C30,26 25,30 20,30 C15,30 10,26 10,20 Z"
					fill="none"
					stroke="#7d604c"
					stroke-width="1"
				/>
				<path d="M20,10 L20,30 M10,20 L30,20" stroke="#7d604c" stroke-width="1" />
			</svg>
		</div>
		<div class="divider"></div>
		<h1 class="footer-links">
			<span class="link-group">
				<span class="icon-wrapper">
					<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						/>
						<path
							d="M12,7V12L15,15"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
				Created by&nbsp;<a href="https://www.stephenokita.com">Stephen Okita</a>
			</span>
			<span class="separator">|</span>
			<span class="link-group">
				<span class="icon-wrapper">
					<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10,2L8,4H4C2.9,4 2,4.9 2,6V18C2,19.1 2.9,20 4,20H20C21.1,20 22,19.1 22,18V6C22,4.9 21.1,4 20,4H16L14,2H10Z"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						/>
						<path
							d="M12,9L9,13H15L12,17"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
				Code can be found&nbsp;
				<a href="https://github.com/TheArctesian/Chinese-Radicals.git">here</a>
			</span>
			<span class="separator">|</span>
			<span class="link-group">
				<span class="icon-wrapper">
					<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						/>
						<path
							d="M7,7H17M7,12H17M7,17H14"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>
				</span>
				A printable pdf of this table can be found&nbsp;
				<a href="stephenokita-chinese-radicls.pdf">here</a>
			</span>
		</h1>
	</footer>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap');

	:global(body) {
		font-family: 'Noto Serif', serif;
		background-color: #f9f6f2;
		color: #3a3a3a;
		margin: 0;
		padding: 0;
		line-height: 1.6;
		background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='rice-paper' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 0 0 L 100 100 M 100 0 L 0 100' stroke='%23e8e0d2' stroke-width='0.5' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23rice-paper)'/%3E%3C/svg%3E");
	}

	.main-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.content {
		flex: 1;
	}

	.footer {
		text-align: center;
		padding: 1.5rem 0;
		border-top: 1px solid #e0d5c5;
		font-size: 0.9rem;
		color: #5a4835;
		position: relative;
	}

	.footer::before {
		content: '';
		position: absolute;
		top: -2px;
		left: 0;
		right: 0;
		height: 1px;
		background-color: #f4efe7;
	}

	.footer h1 {
		font-size: 1rem;
		font-weight: normal;
		margin: 0;
		letter-spacing: 0.5px;
		position: relative;
		display: inline-block;
	}

	.footer a {
		color: #7b6b56;
		text-decoration: none;
		position: relative;
		transition: color 0.3s;
	}

	.footer a::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: #7b6b56;
		transform: scaleX(0);
		transform-origin: bottom right;
		transition: transform 0.3s;
	}

	.footer a:hover {
		color: #5a4835;
	}

	.footer a:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}

	.seal {
		width: 40px;
		height: 40px;
		margin: 0 auto 1rem;
		display: block;
		opacity: 0.8;
	}

	.divider {
		height: 10px;
		width: 100px;
		margin: 0 auto 1rem;
		background-image: url("data:image/svg+xml,%3Csvg width='100' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0,5 C 25,0 75,10 100,5' stroke='%23d9cebb' stroke-width='1' fill='none'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: center;
	}

	.icon-wrapper {
		display: inline-block;
		vertical-align: middle;
		margin-right: 4px;
	}

	.icon {
		width: 16px;
		height: 16px;
		color: #7d604c;
		vertical-align: middle;
	}

	.link-group {
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
	}

	.separator {
		margin: 0 10px;
		color: #d9cebb;
	}

	.footer-links {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
	}

	@media (max-width: 768px) {
		.main-container {
			padding: 1rem;
		}

		.footer {
			margin-top: 2rem;
			padding: 1rem 0;
		}

		h1 {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.separator {
			display: none;
		}

		.link-group {
			margin: 5px 0;
		}
	}
</style>
