import Default from "./default";

export const getTemplate = (template: string) => {
  switch (template) {
    case "default":
      return Default;
    default:
      return Default;
  }
}