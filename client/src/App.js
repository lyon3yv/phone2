import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PhoneSimulator from "@/pages/phone-simulator";
import NotFound from "@/pages/not-found";

function Router() {
  return React.createElement(
    Switch,
    null,
    React.createElement(Route, { path: "/", component: PhoneSimulator }),
    React.createElement(Route, { component: NotFound })
  );
}

function App() {
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(
      TooltipProvider,
      null,
      React.createElement(Toaster, null),
      React.createElement(Router, null)
    )
  );
}

export default App;
