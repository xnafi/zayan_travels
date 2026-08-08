import "next";

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

declare module "next" {
  interface RequestInit {
    next?: NextFetchRequestConfig;
  }
}

export {};