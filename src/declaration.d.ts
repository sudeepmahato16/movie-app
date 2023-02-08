declare module "*.webp";
declare module "*.svg" {
  const content: string;
  export default content;
}
