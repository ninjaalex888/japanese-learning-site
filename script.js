
const apiKey = "KL5K3B5ogtO2hdtyBjmMJ4HTYwX4jQeA";

async function fetchStock() {
  const symbol = document.getElementById("stockInput").value.trim().toUpperCase();
  const resultDiv = document.getElementById("result");
  showSpinner();
  resultDiv.innerHTML = "Loading...";

  if (!symbol) {
    resultDiv.innerHTML = "<p>Please enter a valid stock symbol.</p>";
    showToast("Please enter a stock symbol.", true);
    hideSpinner();
    return;
  }

  try {
    const profileRes = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
    const profile = await profileRes.json();
    if (!profile.length) {
      resultDiv.innerHTML = "<p>Stock not found.</p>";
      showToast("Stock not found!", true);
      hideSpinner();
      return;
    }

    const stock = profile[0];
    const pe = stock.pe;
    const pb = stock.priceToBookRatio;
    const ps = stock.priceToSalesRatioTTM;
    const roe = stock.returnOnEquityTTM;
    const roa = stock.returnOnAssetsTTM;

    const sentiment = `
      <ul>
        <li><strong>1 Year:</strong> ${pe < 15 ? "Likely to grow" : "Moderate outlook"}</li>
        <li><strong>3 Years:</strong> ${roe > 10 ? "Strong potential" : "Flat growth expected"}</li>
        <li><strong>5 Years:</strong> ${pb < 3 ? "Reasonable upside" : "Uncertain performance"}</li>
        <li><strong>10 Years:</strong> ${roa > 5 ? "Long-term value" : "Slow long-term growth"}</li>
        <li><strong>20 Years:</strong> ${(roa > 5 && roe > 10) ? "High confidence in value appreciation" : "Unclear outlook"}</li>
      </ul>`;

    resultDiv.innerHTML = `
      <h2>${stock.companyName} (${stock.symbol})</h2>
      <p><strong>Price:</strong> $${stock.price}</p>
      <p><strong>Market Cap:</strong> $${(stock.mktCap / 1e9).toFixed(2)}B</p>
      <p><strong>P/E Ratio:</strong> ${pe}</p>
      <p><strong>Price/Book Ratio:</strong> ${pb}</p>
      <p><strong>Price/Sales Ratio:</strong> ${ps}</p>
      <p><strong>Return on Equity (ROE):</strong> ${roe}%</p>
      <p><strong>Return on Assets (ROA):</strong> ${roa}%</p>
      <p><strong>Projection Sentiment:</strong></p>
      <p class="sentiment-desc">Based on selected valuation metrics, this section offers a general forecast of the stock's potential value over time. It is not financial advice and should be used for educational purposes only.</p>
      ${sentiment}
      <p><strong>Industry:</strong> ${stock.industry}</p>
      <p><strong>Description:</strong> ${stock.description}</p>
    `;

    fetchCharts(symbol);
  } catch (err) {
    resultDiv.innerHTML = "<p>Error fetching data.</p>";
    console.error(err);
  } finally {
    hideSpinner();
  }
}

async function fetchCharts(symbol) {
  const range = document.getElementById("timeRange").value;
  const days = range * 365;
  const res = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&timeseries=${days}&apikey=${apiKey}`);
  const data = await res.json();
  const prices = data.historical.reverse();
  const labels = prices.map(p => p.date);
  const values = prices.map(p => p.close);

  const ctx = document.getElementById("stockChart").getContext("2d");
  if (window.chart) window.chart.destroy();
  window.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Price",
        data: values,
        fill: true,
        borderColor: "green",
        backgroundColor: "rgba(76,175,80,0.2)",
        tension: 0.3
      }]
    }
  });
}

function showSpinner() {
  document.getElementById("spinner").classList.remove("hidden");
}
function hideSpinner() {
  document.getElementById("spinner").classList.add("hidden");
}

function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast" + (isError ? " error" : "");
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

async function populateSymbolList() {
  try {
    const res = await fetch('https://financialmodelingprep.com/api/v3/stock/list?apikey=' + apiKey);
    const data = await res.json();
    const datalist = document.getElementById('symbolList');
    data.slice(0, 500).forEach(stock => {
      const option = document.createElement('option');
      option.value = stock.symbol;
      datalist.appendChild(option);
    });
  } catch (err) {
    console.error("Error loading symbols:", err);
  }
}

const popularSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "BRK.B", "V", "JNJ"];

function renderPopularStocks() {
  const list = document.getElementById("popularStocks");
  popularSymbols.forEach(symbol => {
    const item = document.createElement("li");
    item.textContent = symbol;
    item.addEventListener("click", () => {
      document.getElementById("stockInput").value = symbol;
      fetchStock();
    });
    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPopularStocks();
  populateSymbolList();

  document.getElementById("getInfoBtn").addEventListener("click", e => {
    e.preventDefault();
    fetchStock();
  });

  document.getElementById("stockInput").addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchStock();
    }
  });

  showToast("Ready to analyze stocks!");
});
