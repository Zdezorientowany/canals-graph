import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import { PageProps as AppPageProps } from "./";
import type { Page, PageProps, Errors, ErrorBag } from "@inertiajs/core";

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;

    interface InertiaProps extends Page<PageProps> {
        errors: Errors & ErrorBag;
        [key: string]: any;
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
            };
        };
    }
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
