const whatsappNumber = "8618675853801";
const whatsappMessage = "Hello ANNICE HOME, I would like to request a quote for roll packed mattresses or compressed sofas.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

document.querySelectorAll(".button.whatsapp, [data-whatsapp-link]").forEach((link) => {
  link.setAttribute("href", whatsappUrl);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
  link.setAttribute("aria-label", "Contact ANNICE HOME on WhatsApp");
});

if (!document.querySelector(".floating-whatsapp")) {
  const floatingWhatsapp = document.createElement("a");
  floatingWhatsapp.className = "floating-whatsapp";
  floatingWhatsapp.href = whatsappUrl;
  floatingWhatsapp.target = "_blank";
  floatingWhatsapp.rel = "noopener";
  floatingWhatsapp.setAttribute("aria-label", "WhatsApp ANNICE HOME at +86 186 7585 3801");
  floatingWhatsapp.innerHTML = `
    <span class="floating-whatsapp-icon" aria-hidden="true">☎</span>
    <span class="floating-whatsapp-text">
      <strong>WhatsApp</strong>
      <small>+86 186 7585 3801</small>
    </span>
  `;
  document.body.appendChild(floatingWhatsapp);
}

if (!document.querySelector(".contact-person-section")) {
  const aliceCard = document.createElement("aside");
  aliceCard.className = "contact-person-section";
  aliceCard.setAttribute("aria-label", "Meet your factory contact Alice");
  aliceCard.innerHTML = `
    <article class="factory-contact-card">
      <div class="factory-contact-photo">
        <img src="/assets/images/alice-factory-contact.jpg" width="220" height="82" loading="lazy" alt="Alice OEM and ODM Sales Manager at ANNICE HOME" />
      </div>
      <div class="factory-contact-copy">
        <p class="section-label">Talk to Alice</p>
        <h2>Project RFQ Review</h2>
        <div class="contact-person-meta">
          <strong>Alice</strong>
          <span>OEM &amp; ODM Sales Manager</span>
        </div>
        <p>Mattress and sofa sourcing support from our Foshan factory.</p>
        <ul class="factory-contact-points">
          <li>OEM &amp; ODM support</li>
          <li>Factory-direct supply</li>
        </ul>
        <div class="factory-contact-actions">
          <a class="button whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener" aria-label="Talk to Alice on WhatsApp">WhatsApp</a>
          <a class="button primary" href="/contact/">Quote</a>
        </div>
      </div>
    </article>
  `;
  document.body.appendChild(aliceCard);
}

const inquiryForms = document.querySelectorAll("[data-inquiry-form]");

inquiryForms.forEach((form) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[0-9\s().-]{7,24}$/;
  const messages = {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid phone number with country code if possible.",
  };

  const setFieldError = (field, message = "") => {
    const error = form.querySelector(`[data-error-for="${field.name}"]`);
    field.classList.toggle("is-invalid", Boolean(message));
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  };

  const validateField = (field) => {
    if (!field.name || field.type === "hidden") return true;
    const value = field.value.trim();
    let message = "";

    if (field.required && !value) {
      message = messages[field.name] || "Please complete this required field.";
    } else if (field.type === "email" && value && !emailPattern.test(value)) {
      message = messages.email;
    } else if (field.name === "phone" && value && !phonePattern.test(value)) {
      message = messages.phone;
    }

    setFieldError(field, message);
    return !message;
  };

  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");

    if (status) {
      status.classList.remove("is-error");
      status.textContent = "";
      status.classList.remove("is-visible");
    }

    const honeypot = form.querySelector('[name="website"]');
    if (honeypot?.value) {
      if (status) {
        status.textContent = "Submission blocked. Please try again.";
        status.classList.add("is-visible", "is-error");
      }
      return;
    }

    const fields = [...form.querySelectorAll("input, textarea, select")].filter((field) => field.name !== "website");
    const validationResults = fields.map(validateField);
    const isValid = validationResults.every(Boolean);

    if (!isValid) {
      if (status) {
        status.textContent = "Please complete the required fields before submitting.";
        status.classList.add("is-visible", "is-error");
      }
      form.querySelector(".is-invalid")?.focus();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    const formData = new FormData(form);
    formData.append("page_url", window.location.href);
    const payload = Object.fromEntries(formData.entries());
    const endpoint = form.dataset.submitEndpoint;

    const finishSuccess = (message) => {
      if (status) {
        status.textContent = message || "Thank you. Your inquiry has been received. Our sales team will contact you soon.";
        status.classList.remove("is-error");
        status.classList.add("is-visible");
      }
      form.reset();
    };

    const finishError = (message) => {
      if (status) {
        status.textContent = message || "Submission failed. Please email dzhou722@gmail.com or try again later.";
        status.classList.add("is-visible", "is-error");
      }
    };

    const finish = () => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    };

    if (!endpoint) {
      console.info("Inquiry form payload ready for backend integration:", payload);
      window.setTimeout(() => {
        finishSuccess();
        finish();
      }, 450);
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.success === "false" || data.success === false) {
          throw new Error(data.message || "Submission failed");
        }
        finishSuccess(data.message);
      })
      .catch((error) => finishError(error.message))
      .finally(finish);
  });
});

document.querySelectorAll("[data-faq-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    item?.classList.toggle("is-open", !expanded);
  });
});

document.querySelectorAll(".site-header").forEach((header) => {
  const navActions = header.querySelector(".nav-actions");

  if (navActions && !navActions.querySelector(".language-switcher")) {
    const languages = [
      { code: "ES", name: "Español", market: "Spanish SEO Library", href: "/es/" },
      { code: "PT", name: "Português BR", market: "Brazil Market SEO", href: "/pt-br/" },
      { code: "FR", name: "Français", market: "French Africa SEO", href: "/fr/" },
      { code: "AR", name: "العربية", market: "Middle East SEO", href: "/ar/" },
    ];

    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.innerHTML = `
      <button class="language-toggle" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Select website language">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.4 2.6 3.6 5.6 3.6 9S14.4 18.4 12 21M12 3C9.6 5.6 8.4 8.6 8.4 12S9.6 18.4 12 21"></path></svg>
        <span>Languages</span>
      </button>
      <div class="language-menu" role="menu">
        ${languages.map((language) => `
          <a href="${language.href}" role="menuitem">
            <span class="language-code">${language.code}</span>
            <span><strong>${language.name}</strong><small>${language.market}</small></span>
          </a>
        `).join("")}
      </div>
    `;
    navActions.prepend(switcher);

    const toggle = switcher.querySelector(".language-toggle");
    const closeLanguageMenu = () => {
      switcher.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = switcher.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    switcher.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("click", closeLanguageMenu);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLanguageMenu();
    });
  }

  if (header.querySelector(".mega-menu")) return;

  const productsLink = header.querySelector('.nav-links a[href="/products/"]');
  if (!productsLink) return;

  productsLink.classList.add("has-mega");
  productsLink.setAttribute("aria-haspopup", "true");
  productsLink.setAttribute("aria-expanded", "false");

  const mega = document.createElement("div");
  mega.className = "mega-menu";
  mega.setAttribute("aria-label", "Products and sourcing menu");
  mega.innerHTML = `
    <div class="mega-panel">
      <div class="mega-column mega-feature">
        <p class="mega-label">ANNICE HOME Product Lines</p>
        <h3>Mattress and compressed sofa programs for B2B export buyers</h3>
        <p>Fast access to roll packed mattress, OEM mattress, private label mattress, compressed sofa, and sofa in a box sourcing pages.</p>
        <a class="button primary" href="/contact/">Get Free Quote</a>
      </div>
      <div class="mega-column">
        <p class="mega-label">Mattress</p>
        <a class="mega-link" href="/products/roll-packed-mattress/"><span>Roll Packed Mattress</span><small>Vacuum compressed / bed in a box</small></a>
        <a class="mega-link" href="/products/vacuum-packed-mattress/"><span>Vacuum Packed Mattress</span><small>Compressed mattress supplier page</small></a>
        <a class="mega-link" href="/products/oem-mattress/"><span>OEM Mattress</span><small>Custom mattress manufacturing</small></a>
        <a class="mega-link" href="/products/mattress-topper/"><span>Mattress Topper</span><small>Private label sleep accessories</small></a>
        <a class="mega-link" href="/products/pocket-spring-mattress/"><span>Pocket Spring Mattress</span><small>Supportive wholesale mattress lines</small></a>
        <a class="mega-link" href="/products/memory-foam-mattress/"><span>Memory Foam Mattress</span><small>Pressure relief and private label comfort</small></a>
        <a class="mega-link" href="/products/hybrid-mattress/"><span>Hybrid Mattress</span><small>Pocket spring plus foam construction</small></a>
      </div>
      <div class="mega-column">
        <p class="mega-label">Sofa</p>
        <a class="mega-link" href="/products/compressed-sofa/"><span>Compressed Sofa</span><small>Vacuum packed sofa / compressed couch</small></a>
        <a class="mega-link" href="/products/vacuum-packed-sofa/"><span>Vacuum Packed Sofa</span><small>Sofa in a box supplier page</small></a>
        <a class="mega-link" href="/products/sofa-bed/"><span>Sofa Bed</span><small>Multifunctional sofa and bed programs</small></a>
        <a class="mega-link" href="/compressed-sofa-manufacturer/"><span>Sofa in a Box Manufacturer</span><small>High-intent ad and SEO landing page</small></a>
      </div>
      <div class="mega-column">
        <p class="mega-label">OEM & Sourcing</p>
        <a class="mega-link" href="/roll-packed-mattress-manufacturer/"><span>Mattress Manufacturer</span><small>For importers and distributors</small></a>
        <a class="mega-link" href="/oem-mattress-manufacturer/"><span>OEM Mattress Manufacturer</span><small>Custom mattress manufacturer support</small></a>
        <a class="mega-link" href="/private-label-mattress-manufacturer/"><span>Private Label Mattress</span><small>Brand owner and e-commerce programs</small></a>
        <a class="mega-link" href="/factory/"><span>Factory Capability</span><small>Workshop, packing, loading, QC</small></a>
      </div>
    </div>
  `;

  header.appendChild(mega);

  let closeTimer;
  const open = () => {
    clearTimeout(closeTimer);
    header.classList.add("mega-open");
    productsLink.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    closeTimer = setTimeout(() => {
      header.classList.remove("mega-open");
      productsLink.setAttribute("aria-expanded", "false");
    }, 120);
  };

  productsLink.addEventListener("mouseenter", open);
  productsLink.addEventListener("focus", open);
  productsLink.addEventListener("click", (event) => {
    if (window.matchMedia("(min-width: 981px)").matches) {
      event.preventDefault();
      header.classList.toggle("mega-open");
      productsLink.setAttribute("aria-expanded", String(header.classList.contains("mega-open")));
    }
  });
  header.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  header.addEventListener("mouseleave", close);
  mega.addEventListener("mouseenter", open);
  mega.addEventListener("mouseleave", close);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      header.classList.remove("mega-open");
      productsLink.setAttribute("aria-expanded", "false");
      productsLink.focus();
    }
  });
});


if (!document.querySelector(".floating-rfq")) {
  const floatingRfq = document.createElement("a");
  floatingRfq.className = "floating-rfq";
  floatingRfq.href = "/contact/";
  floatingRfq.textContent = "Request Factory Price";
  document.body.appendChild(floatingRfq);
}
