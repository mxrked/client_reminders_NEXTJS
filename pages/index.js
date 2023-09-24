/**
 *
 *  RESOURCES
 *
 *  https://www.youtube.com/watch?v=T2xaiw7VK4A&t=143s
 *
 */

// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports
import FilterAddClient from "@/assets/functions/dom/filters/FilterAddClient";
import FilterRemindAClient from "@/assets/functions/dom/filters/FilterRemindAClient";
import FilterRemindAllClients from "@/assets/functions/dom/filters/FilterRemindAllClients";
import FilterViewClients from "@/assets/functions/dom/filters/FilterViewClients";

// Component Imports

// Style Imports
import styles from "../assets/styles/modules/Index/Index.module.css";
import "../assets/styles/modules/Index/Index.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div id="PAGE" className={`${styles.page} page index-page`}>
      <div className={`${styles.page_inner} page-inner`}>
        <div className={`${styles.page_inner_top}`}>
          <h1>Client Reminders.</h1>

          <p>
            This website is used to remind my freelance clients to pay their
            fees via email and text messaging.
          </p>
        </div>

        <div className={`${styles.page_inner_filters}`}>
          <button
            id="addClient"
            className={`${styles.add_client} half-second`}
            onClick={FilterAddClient}
          >
            <span>Add Client</span>
          </button>
          <button
            id="viewClients"
            className={`${styles.view_clients} half-second`}
            onClick={FilterViewClients}
          >
            <span>View Clients</span>
          </button>
          <button
            id="remindAClient"
            className={`${styles.remind_a_client} half-second`}
            onClick={FilterRemindAClient}
          >
            <span>Remind A Client</span>
          </button>
          <button
            id="remindAllClients"
            className={`${styles.remind_all_clients} half-second`}
            onClick={FilterRemindAllClients}
          >
            <span>Remind All Clients</span>
          </button>
          <button
            id="testMonthlyEmail"
            className={`${styles.test_monthly_email} half-second`}
          >
            <span>Send Test Monthly Email</span>
          </button>
        </div>

        <div className={`${styles.page_inner_panels_holder}`}>
          <div
            id="addClientPanel"
            className={`${styles.panel} ${styles.add_client_panel} panel`}
          >
            Add Client Panel
          </div>
          <div
            id="viewClientsPanel"
            className={`${styles.panel} ${styles.view_clients_panel} panel`}
          >
            View Clients Panel
          </div>
          <div
            id="remindAClientPanel"
            className={`${styles.panel} ${styles.remind_a_client_panel} panel`}
          >
            Remind A Client Panel
          </div>
          <div
            id="remindAllClientsPanel"
            className={`${styles.panel} ${styles.remind_all_clients_panel} panel`}
          >
            Remind All Clients Panel
          </div>
        </div>
      </div>
    </div>
  );
}
