import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			flesh: {
  				'50': '#fdf5ef',
  				'100': '#fbe8d9',
  				'200': '#f4c29f',
  				'300': '#f0ac81',
  				'400': '#e9814e',
  				'500': '#e4602b',
  				'600': '#d54921',
  				'700': '#b1361d',
  				'800': '#8d2c1f',
  				'900': '#72271c',
  				'950': '#3d110d'
  			},
  			primrose: {
  				'50': '#fcfbea',
  				'100': '#f8f6c9',
  				'200': '#f4ed9f',
  				'300': '#ecda58',
  				'400': '#e4c62b',
  				'500': '#d4af1e',
  				'600': '#b78917',
  				'700': '#926416',
  				'800': '#7a5019',
  				'900': '#68421b',
  				'950': '#3c230c'
  			},
  			gossip: {
  				'50': '#f6fde8',
  				'100': '#e8facd',
  				'200': '#d1f49f',
  				'300': '#b4eb6b',
  				'400': '#97dd3e',
  				'500': '#78c31f',
  				'600': '#5b9b15',
  				'700': '#467615',
  				'800': '#395e16',
  				'900': '#325017',
  				'950': '#182c07'
  			},
  			'mint-green': {
  				'50': '#f2fdf0',
  				'100': '#defddb',
  				'200': '#c0f8ba',
  				'300': '#a6f49f',
  				'400': '#53e147',
  				'500': '#2cc81f',
  				'600': '#1ea613',
  				'700': '#1a8213',
  				'800': '#1a6615',
  				'900': '#165413',
  				'950': '#052f04'
  			},
  			madang: {
  				'50': '#ecfdf3',
  				'100': '#d0fbe0',
  				'200': '#9ff4c2',
  				'300': '#6beaa8',
  				'400': '#30d785',
  				'500': '#0cbd6b',
  				'600': '#029957',
  				'700': '#017b48',
  				'800': '#04613b',
  				'900': '#045032',
  				'950': '#012d1c'
  			},
  			'water-leaf': {
  				'50': '#f0fdfb',
  				'100': '#cdfaf5',
  				'200': '#9ff4ed',
  				'300': '#62e6e1',
  				'400': '#31d0ce',
  				'500': '#18b4b4',
  				'600': '#118d90',
  				'700': '#126f73',
  				'800': '#13595c',
  				'900': '#15494c',
  				'950': '#052a2e'
  			},
  			cornflower: {
  				'50': '#f1f8fe',
  				'100': '#e3effb',
  				'200': '#c0dff7',
  				'300': '#9fd1f4',
  				'400': '#48a9e8',
  				'500': '#208ed7',
  				'600': '#1371b6',
  				'700': '#105994',
  				'800': '#124d7a',
  				'900': '#144166',
  				'950': '#0d2944'
  			},
  			portage: {
  				'50': '#eff2fe',
  				'100': '#e2e6fd',
  				'200': '#cbd0fa',
  				'300': '#9fa6f4',
  				'400': '#8a8aef',
  				'500': '#776ee6',
  				'600': '#6652d9',
  				'700': '#5743bf',
  				'800': '#48399a',
  				'900': '#3d347b',
  				'950': '#251f47'
  			},
  			'biloba-flower': {
  				'50': '#f9f6fe',
  				'100': '#f1eafd',
  				'200': '#e6d8fc',
  				'300': '#d3baf8',
  				'400': '#c29ff4',
  				'500': '#9c62ea',
  				'600': '#8442db',
  				'700': '#7030c0',
  				'800': '#602c9d',
  				'900': '#4f257e',
  				'950': '#330f5c'
  			},
  			'lavender-rose': {
  				'50': '#fdf5fe',
  				'100': '#faeafd',
  				'200': '#f6d3fb',
  				'300': '#ed9ff4',
  				'400': '#e882f0',
  				'500': '#da52e3',
  				'600': '#c033c6',
  				'700': '#a127a4',
  				'800': '#862286',
  				'900': '#6e216d',
  				'950': '#490949'
  			},
  			illusion: {
  				'50': '#fdf2f8',
  				'100': '#fbe8f4',
  				'200': '#f9d1ea',
  				'300': '#f49fd1',
  				'400': '#ee78bb',
  				'500': '#e54fa0',
  				'600': '#d32f7f',
  				'700': '#b71f65',
  				'800': '#971d53',
  				'900': '#7e1d48',
  				'950': '#4d0a28'
  			},
  			'sea-pink': {
  				'50': '#fef2f3',
  				'100': '#fde6e7',
  				'200': '#fad1d4',
  				'300': '#f49fa6',
  				'400': '#ef7d88',
  				'500': '#e54e62',
  				'600': '#d02e4a',
  				'700': '#af213d',
  				'800': '#931e39',
  				'900': '#7e1d37',
  				'950': '#460b1a'
  			},
  			'wax-flower': {
  				'50': '#fdf5f3',
  				'100': '#fceae4',
  				'200': '#fad9ce',
  				'300': '#f4b49f',
  				'400': '#ee977b',
  				'500': '#e27551',
  				'600': '#ce5a34',
  				'700': '#ad4928',
  				'800': '#8f3f25',
  				'900': '#783924',
  				'950': '#411b0e'
  			},
  			chalky: {
  				'50': '#fdf9ed',
  				'100': '#f9eecc',
  				'200': '#f4df9f',
  				'300': '#ecc45d',
  				'400': '#e8af37',
  				'500': '#e09020',
  				'600': '#c66e19',
  				'700': '#a54e18',
  				'800': '#863e1a',
  				'900': '#6f3418',
  				'950': '#3f1909'
  			},
  			tidal: {
  				'50': '#f9fde8',
  				'100': '#f0facd',
  				'200': '#dff49f',
  				'300': '#c9eb6b',
  				'400': '#b1dd3e',
  				'500': '#93c31f',
  				'600': '#729b15',
  				'700': '#567615',
  				'800': '#455e16',
  				'900': '#3c5017',
  				'950': '#1e2c07'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
