let quote = document.getElementById("quote");
let author = document.getElementById("author");

console.log(quote)
console.log(author)

async function getQuote() {
    try {
        const result = await fetch("https://dummyjson.com/quotes/random");
        const data = await result.json();

        const translationUrl = new URL("https://api.mymemory.translated.net/get");
        translationUrl.search = new URLSearchParams({
            q: data.quote,
            langpair: "en|id"
        });

        const translationResult = await fetch(translationUrl);
        if (!translationResult.ok) {
            throw new Error("Layanan terjemahan tidak bisa diakses.");
        }

        const translationData = await translationResult.json();
        quote.textContent = translationData.responseData.translatedText;
        author.textContent = data.author;
    } catch (error) {
        console.error("Gagal mengambil atau menerjemahkan quote:", error);
        quote.textContent = "Quote tidak bisa dimuat. Coba lagi.";
    }
}