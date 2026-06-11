import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <section>
            <article>
                <Outlet />
            </article>
        </section>
    );
};

export default MainLayout;