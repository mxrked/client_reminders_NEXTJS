/**
 *
 *  This is used to switch to the View Clients panel
 *
 */

export default function FilterViewClients() {
  // alert("View Clients Panel.");

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.style.display = "none";
  });

  document.getElementById("viewClientsPanel").style.display = "block";
}
