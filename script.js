// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form   = document.querySelector(".order-form");
  const result = document.getElementById("result");
  const button = form.querySelector(".order-btn");

  if (!form || !result || !button) return; // safety

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // don't leave the page

    // reset message
    result.classList.remove("show", "error");
    result.textContent = "";

    // basic UI state
    button.disabled = true;
    button.textContent = "Sending…";

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        // success
        result.textContent = "Your order was sent successfully. We'll email you with an offer soon.";
        result.classList.add("show");
        form.reset();
      } else {
        // web3forms returned an error
        console.error("Web3Forms error:", data);
        result.textContent = "Something went wrong. Please try again in a minute.";
        result.classList.add("show", "error");
      }
    } catch (err) {
      console.error("Request failed:", err);
      result.textContent = "Network error. Check your connection and try again.";
      result.classList.add("show", "error");
    } finally {
      button.disabled = false;
      button.textContent = "Send order";
    }
  });
});
