export async function svgInjector(source, fillColor = "currentColor", targetSelector = "body", options = {}) {
    const {
        strokeColor = null,
        strokeWidth = null,
        blur = null,
        glow = null,
        dropshadow = null,
        opacity = null,
        gradient = null
    } = options;

    try {
        const response = await fetch(source);
        if (!response.ok) throw new Error("SVG unfound !");
        const svgText = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svg = doc.querySelector("svg");
        if (!svg) throw new Error("SVG mal formaté.");

        // Appliquer styles aux formes internes
        const shapes = svg.querySelectorAll("path, circle, rect, polygon, ellipse");
        shapes.forEach(el => {
            if (fillColor) el.setAttribute("fill", fillColor);
            if (strokeColor) el.setAttribute("stroke", strokeColor);
            if (strokeWidth) el.setAttribute("stroke-width", strokeWidth);
            if (opacity) el.setAttribute("opacity", opacity);
        });

        // Appliquer filtre CSS
        let filters = [];
        if (blur) filters.push(`blur(${blur}px)`);
        if (glow) filters.push(`drop-shadow(0 0 ${glow}px ${strokeColor || fillColor})`);
        if (dropshadow) filters.push(`drop-shadow(0 0 ${dropshadow}px ${strokeColor || fillColor})`);
        if (filters.length) svg.style.filter = filters.join(" ");

        // Ajouter un dégradé si fourni
        if (gradient) {
            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            defs.innerHTML = gradient;
            svg.prepend(defs);
            shapes.forEach(el => el.setAttribute("fill", "url(#gradient)"));
        }

        // Injecter dans le DOM directement
        const target = document.querySelector(targetSelector);
        if (target) target.appendChild(svg);
        else console.warn("Cible infound :", targetSelector);
    } catch (err) {
        console.error("Error injection SVG :", err.message);
    }
}
