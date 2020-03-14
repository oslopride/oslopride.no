export function rightAngledTriangleHeight(width: number, angleDeg: number) {
	const radians = (angleDeg * Math.PI) / 180;
	return Math.tan(radians) * width;
}
