document.addEventListener('DOMContentLoaded', function() {
  const wordsToHighlight = ["Syria", "Israel", "Lebanon", "Egypt"]; // Add your words here

  // Function to wrap words in span elements
  function wrapWords(node: Text | Element) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const parent = node.parentNode as Element;
      wordsToHighlight.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        if (regex.test(text || '')) {
          const span = document.createElement('span');
          span.textContent = word;
          span.style.cursor = 'pointer';
          span.classList.add('highlighted-word');
          text?.split(regex).forEach((part, index, array) => {
            parent.insertBefore(document.createTextNode(part), node);
            if (index < array.length - 1) {
              parent.insertBefore(span.cloneNode(true), node);
            }
          });
          parent.removeChild(node);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(child => wrapWords(child as Text | Element));
    }
  }

  
  // Wrap words in span elements
  wrapWords(document.body);

  // Add event listeners to the span elements
  document.querySelectorAll('.highlighted-word').forEach(span => {
    span.addEventListener('mouseover', function(event) {
      const target = event.target as HTMLElement;
      const word = target.textContent;
      const tooltip = document.createElement('div');
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = 'white';
      tooltip.style.border = '1px solid black';
      tooltip.style.padding = '5px';
      tooltip.style.zIndex = '1000';
      tooltip.style.width = '300px';
      tooltip.style.height = '200px';

      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = 'none'; // Use CSS to remove the border
      iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBPgh7p3fExTym42sBp7N6D3ksdpinrycg&q=${word}`;
      tooltip.appendChild(iframe);

      document.body.appendChild(tooltip);

      const rect = target.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY}px`;

      event?.target?.addEventListener('mouseout', function() {
        tooltip.remove();
      }, { once: true });
    });
  });
});
