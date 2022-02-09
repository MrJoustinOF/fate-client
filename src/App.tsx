import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Layout } from "./components/Layout";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Signup } from "./views/Signup";
import { Me } from "./views/Me";
import { NotFound } from "./views/NotFound";
import { MyPosts } from "./views/MyPosts";
import { Forbidden } from "./views/Forbidden";
import { OnePost } from "./views/OnePost";
import { UsersPanel } from "./views/UsersPanel";
import { EditPost } from "./views/EditPost";
import { AllPosts } from "./views/AllPosts";
import { WelcomeAdmin } from "./views/WelcomeAdmin";
import { CreatePost } from "./views/CreatePost";

export const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="me" element={<Me />} />

            <Route path="posts">
              <Route index element={<AllPosts />} />
              <Route path=":id/edit" element={<EditPost />} />
              <Route path=":id" element={<OnePost />} />
            </Route>

            <Route path="admin">
              <Route index element={<WelcomeAdmin />} />
              <Route path="myposts" element={<MyPosts />} />
              <Route path="createpost" element={<CreatePost />} />
              <Route path="users" element={<UsersPanel />} />
            </Route>

            <Route path="forbidden" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};
