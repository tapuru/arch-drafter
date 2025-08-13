import { Suspense } from "react";
import { Routes } from "react-router-dom";

import { renderRoutes, routerConfig } from "@/shared/config/routing";

export const AppRouter = () => (

  //todo: добавить компоненту лоадера в fallback🐉🐉🐉
  <Suspense fallback="">
    <div className="content">
      <Routes>{renderRoutes(routerConfig)}</Routes>
    </div>
  </Suspense>
);
