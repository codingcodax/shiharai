const BLADE_COUNT = 8;
const DURATION = 1.0;
const VIEWBOX_SIZE = 20;
const CENTER = VIEWBOX_SIZE / 2;
const OUTER_RADIUS = CENTER * 0.8;
const INNER_RADIUS = CENTER * 0.4;
const DELAY_UNIT = DURATION / BLADE_COUNT;

/**
 * iOS style loading spinner component.
 * Renders rotating blades using SVG and opacity animation.
 */
export const Spinner = ({ className }: { className?: string }) => {
	return (
		<div className='inline-block'>
			<style>
				{`
          @keyframes spinner {
            0% { opacity: 0.2; }
            ${100 / BLADE_COUNT}% { opacity: 1; }
            ${2 * (100 / BLADE_COUNT)}% { opacity: 0.8; }
            ${3 * (100 / BLADE_COUNT)}% { opacity: 0.6; }
            ${4 * (100 / BLADE_COUNT)}% { opacity: 0.4; }
            ${5 * (100 / BLADE_COUNT)}% { opacity: 0.3; }
            ${6 * (100 / BLADE_COUNT)}% { opacity: 0.25; }
            ${7 * (100 / BLADE_COUNT)}% { opacity: 0.2; }
            100% { opacity: 0.2; }
          }
        `}
			</style>

			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
				className={`w-6 h-6 ${className}`}
			>
				{Array.from({ length: BLADE_COUNT }).map((_, i) => {
					const angle =
						((i * 360) / BLADE_COUNT) * (Math.PI / 180) - Math.PI / 2;
					const x1 = CENTER + Math.cos(angle) * INNER_RADIUS;
					const y1 = CENTER + Math.sin(angle) * INNER_RADIUS;
					const x2 = CENTER + Math.cos(angle) * OUTER_RADIUS;
					const y2 = CENTER + Math.sin(angle) * OUTER_RADIUS;

					return (
						<line
							key={i}
							x1={x1}
							y1={y1}
							x2={x2}
							y2={y2}
							strokeWidth='2'
							stroke='currentColor'
							strokeLinecap='round'
							style={{
								animation: `spinner ${DURATION}s ease-in-out ${i * DELAY_UNIT}s infinite both`,
							}}
						/>
					);
				})}
			</svg>
		</div>
	);
};
