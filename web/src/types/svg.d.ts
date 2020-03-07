declare module "*.svg" {
	export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
	const content: React.FC<React.HTMLProps<SVGElement>>;
	export default content;
}
