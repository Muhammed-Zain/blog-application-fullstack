import "./App.css";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { UserContextProvider } from "./contextAPI/UserContext";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import { EditPost } from "./pages/EditPost";
import { SkeletonTheme } from "react-loading-skeleton";
import { MyPosts } from "./pages/MyPosts";

function App() {
  return (
    <UserContextProvider>
      <SkeletonTheme highlightColor="#F5F5F5" baseColor="#D3D3D3">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path={"/post/:id"} element={<SinglePost />} />
            <Route path={"edit/:id"} element={<EditPost />} />
            <Route path={"/myposts/:id"} element={<MyPosts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SkeletonTheme>
    </UserContextProvider>
  );
}

export default App;
