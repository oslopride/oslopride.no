declare module "*.svg" {
	export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
	const content: string;
	export default content;
}
