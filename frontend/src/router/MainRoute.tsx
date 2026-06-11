import MainLayout from "@/layout/MainLayout";

export const MainRouters = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
        },
    ],
};