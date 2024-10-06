$(document).ready(function () {
  $(".about-btn").on("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    window.location.href = "about.html"; // Navigate to About page
  });

  // Handle navigation back to the Home page
  $(".home-link").on("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    window.location.href = "index.html"; // Navigate to Home page
  });

  const $selected = $(".selected");
  const $optionsContainer = $(".options");
  const $optionsList = $(".option");

  // Toggle options container on selected click
  $selected.on("click", function () {
    $optionsContainer.toggleClass("active");
  });

  // Update selected text and value when an option is clicked
  $optionsList.on("click", function () {
    $selected.text($(this).text()); // Update selected text
    $selected.data("value", $(this).data("value")); // Update data-value
    $optionsContainer.removeClass("active"); // Close options
  });

  // Close options if clicked outside
  $(document).on("click", function (e) {
    if (
      !$selected.is(e.target) &&
      !$optionsContainer.is(e.target) &&
      $optionsContainer.has(e.target).length === 0
    ) {
      $optionsContainer.removeClass("active"); // Close options
    }
  });
});
