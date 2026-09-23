const printCV = document.getElementById("print-cv");
if (printCV) {
  printCV.hidden = false;
  printCV.addEventListener("click", () => window.print());
}
