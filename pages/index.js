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
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  const [DB_CONNECTION_STATUS, SET_DB_CONNECTION_STATUS] = useState("");
  const [CLIENTS, SET_CLIENTS] = useState([]);

  // Fetching database connection status
  useEffect(() => {
    fetch("/api/testConnection")
      .then((response) => response.json())
      .then((data) => {
        SET_DB_CONNECTION_STATUS(data.message);

        console.log(DB_CONNECTION_STATUS);
      })
      .catch((error) => {
        console.error("Error fetching database connection: " + error);
      });
  }, []);

  return (
    <div id="PAGE" className={`${styles.page} page index-page`}>
      <div className={`${styles.page_inner} page-inner`}>
        <div className={`${styles.page_inner_top}`}>
          <div className={`${styles.page_inner_top_cnt}`}>
            <h1>Client Reminders.</h1>

            <p>
              This website is used to remind my freelance clients to pay their
              fees via email and text messaging.
            </p>
          </div>
        </div>

        <div className={`${styles.page_inner_filters}`}>
          <button
            id="viewClients"
            className={`${styles.view_clients} half-second`}
            onClick={() => {
              FilterViewClients();

              SET_CLIENTS([]); // Showing the loading text

              // Updating the data
              const timestamp = Date.now();
              setTimeout(() => {
                fetch(`/api/clientsDataToDB`)
                  .then((response) => response.json())
                  .then((data) => {
                    fetch(`/api/getClientsFromDB?timestamp=${timestamp}`)
                      .then((response) => response.json())
                      .then((data) => {
                        SET_CLIENTS(data);
                      })
                      .catch((error) => {
                        console.error("Error fetching clients data: " + error);
                      });
                  })
                  .catch((error) => {
                    console.error("Error fetching clients data: " + error);
                  });
              }, 9400);
            }}
          >
            <span>View/Refresh Clients</span>
          </button>
          <button
            id="addClient"
            className={`${styles.add_client} half-second`}
            onClick={FilterAddClient}
          >
            <span>Add Client</span>
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
          {/**
          <button
            id="testMonthlyEmail"
            className={`${styles.test_monthly_email} half-second`}
          >
            <span>Send Test Monthly Email</span>
          </button>
          */}
        </div>

        <div className={`${styles.page_inner_panels_holder}`}>
          <div
            id="addClientPanel"
            className={`${styles.panel} ${styles.add_client_panel} panel`}
          >
            <div className={`${styles.panel_inner}`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className={`${styles.client_set}`}>
                  <label>Client Name:</label>
                  <input type="text" id="clientName" name="clientName" />
                </div>

                <button id="addClient" type="submit">
                  <span>Add Client</span>
                </button>
              </form>
            </div>
          </div>
          <div
            id="viewClientsPanel"
            className={`${styles.panel} ${styles.view_clients_panel} panel`}
          >
            <div className={`${styles.panel_inner}`}>
              <div className={`${styles.panel_inner_box} container-fluid`}>
                <div className={`${styles.panel_inner_row} row`}>
                  {/***/}
                  {CLIENTS.length === 0 ? (
                    <span className={`${styles.loading} half-second`}>
                      Loading Data ...
                    </span>
                  ) : (
                    CLIENTS.map((client) => (
                      <div
                        key={client.client_ID}
                        className={`${styles.client} col-lg-6 col-md-6 col-sm-6 col-xs-12`}
                      >
                        <div className={`${styles.client_inner}`}>
                          <span className={`${styles.client_id} half-second`}>
                            {client.client_ID}
                          </span>
                          <span className={`${styles.client_name} half-second`}>
                            {client.client_Name}
                          </span>
                          <span
                            className={`${styles.client_company} half-second`}
                          >
                            {client.client_Company}
                          </span>
                          <span
                            className={`${styles.client_monthly_pricing} half-second`}
                          >
                            Monthly Price: ${client.client_MonthlyPricing}
                          </span>
                          {client.client_NeedsDomainPayment === true ? (
                            <span
                              className={`${styles.client_domain_payment} half-second`}
                            >
                              Domain Payment:{" "}
                              <span>${client.client_DomainPayment}</span>
                            </span>
                          ) : (
                            <span
                              className={`${styles.client_domain_payment} half-second`}
                            >
                              Domain Payment: None
                            </span>
                          )}
                          {client.client_PayDate !== "" ? (
                            <span
                              className={`${styles.client_paydate} half-second`}
                            >
                              Monthly Pay Date:{" "}
                              <span>
                                {currentMonth} {client.client_PayDate}
                              </span>
                            </span>
                          ) : (
                            <span
                              className={`${styles.client_paydate} half-second`}
                            >
                              Monthly Pay Date: None
                            </span>
                          )}
                          <span
                            className={`${styles.client_payments_collected} half-second`}
                          >
                            Payments Collected:{" "}
                            <span>{client.client_PaymentsCollected}</span>
                          </span>
                          {client.client_Email !== "" ? (
                            <span
                              className={`${styles.client_email} half-second`}
                            >
                              Email: <span>{client.client_Email}</span>
                            </span>
                          ) : (
                            <span
                              className={`${styles.client_email} half-second`}
                            >
                              Email: None
                            </span>
                          )}
                          {client.client_PhoneNumber !== "" ? (
                            <span
                              className={`${styles.client_phone_number} half-second`}
                            >
                              Phone Number:{" "}
                              <span>{client.client_PhoneNumber}</span>
                            </span>
                          ) : (
                            <span
                              className={`${styles.client_phone_number} half-second`}
                            >
                              Phone Number: None
                            </span>
                          )}
                          <span
                            onClick={() => {
                              window.open(
                                "https://" + client.client_Domain,
                                "_blank"
                              );
                            }}
                            className={`${styles.client_domain} half-second`}
                          >
                            View Website
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            id="remindAClientPanel"
            className={`${styles.panel} ${styles.remind_a_client_panel} panel`}
          >
            Remind A Client Panel
          </div>
          {/***/}
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
