export const trimRegionNamespace = (region: string) =>
  region.replace("http://dbpedia.org/resource/", "").replace("_Oblast", "");
