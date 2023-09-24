/**
 *
 *  This is used to switch to the Add Client panel
 *
 */

export default function FilterAddClient() {
  // alert("Add Client Panel.");

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.style.display = "none";
  });

  document.getElementById("addClientPanel").style.display = "block";
}
