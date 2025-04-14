import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Infos",
    path: "/info",
    newTab: false,
  },
  {
    id: 33,
    title: "ExtraCurricular",
    path: "/extracurricular",
    newTab: false,
  },
  {
    id: 3,
    title: "Support",
    path: "/questions",
    newTab: false,
  },
  {
    id: 4,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Infos Page",
        path: "/info",
        newTab: false,
      },
      {
        id: 42,
        title: "Questions Page",
        path: "/questions",
        newTab: false,
      },
      {
        id: 46,
        title: "Sign In Page",
        path: "/signin",
        newTab: false,
      },
      {
        id: 47,
        title: "Sign Up Page",
        path: "/signup",
        newTab: false,
      },
      {
        id: 48,
        title: "Error Page",
        path: "/error",
        newTab: false,
      },
    ],
  },
];
export default menuData;
