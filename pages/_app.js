// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports
import "bootstrap/dist/css/bootstrap.min.css";

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../assets/styles/tools/global_classnames/global_classnames.css";
import "../assets/styles/tools/overrides/overrides.css";
import "../assets/styles/tools/resets/resets.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  //! Session/Local Storage Clearing
  useEffect(() => {}, [router]);

  useEffect(() => {}, [router, router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
