/**
 *
 *  This is used to switch to the Remind A Client panel
 *
 */

export default function FilterRemindAClient() {
  // alert("Remind A Client Panel.");

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.style.display = "none";
  });

  document.getElementById("remindAClientPanel").style.display = "block";
}
