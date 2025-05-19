function showLoadingIndicator(indicator) {
  indicator.classList.add("active");
  const useElement = indicator.querySelector("use");
}

function hideLoadingIndicator(indicator) {
  indicator.classList.remove("active");
  const useElement = indicator.querySelector("use");
}

async function withLoading(indicator, promise) {
  showLoadingIndicator(indicator);
  try {
    const result = await promise;
    return result;
  } finally {
    hideLoadingIndicator(indicator);
  }
}
