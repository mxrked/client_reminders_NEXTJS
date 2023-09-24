/**
 *
 *  This is used to switch to the Remind All Clients panel
 *
 */

export default function FilterRemindAllClients() {
  // alert("Remind All Clients Panel.");

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.style.display = "none";
  });

  document.getElementById("remindAllClientsPanel").style.display = "block";
}
