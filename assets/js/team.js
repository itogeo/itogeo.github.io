const initTeamSections = () => {
  const sections = document.querySelectorAll('.team-section');
  const hoverMediaQuery = window.matchMedia('(hover: hover)');

  if (!sections.length) {
    return;
  }

  sections.forEach((section) => {
    if (section.dataset.teamInitialized === 'true') {
      return;
    }

    const cards = Array.from(section.querySelectorAll('.team-card[data-member]'));
    if (!cards.length) {
      return;
    }

    const clampVisibleCards = () => {
      const limitAttr = section.dataset.teamLimit || 'all';
      let limit = limitAttr === 'all' ? Infinity : parseInt(limitAttr, 10);
      if (!Number.isFinite(limit) || limit <= 0) {
        limit = Infinity;
      }

      const eligible = cards.filter((card) => card.dataset.visible !== 'false');
      if (!eligible.length) {
        // Guarantee at least one card shows up so the grid never collapses completely
        cards[0].hidden = false;
        cards[0].dataset.visible = cards[0].dataset.visible || 'true';
        return;
      }

      eligible.forEach((card, index) => {
        const shouldShow = index < limit;
        card.hidden = !shouldShow;
        if (!shouldShow) {
          card.removeAttribute('data-expanded');
        }
      });

      cards
        .filter((card) => card.dataset.visible === 'false' && !card.hidden)
        .forEach((card) => {
          card.hidden = true;
          card.removeAttribute('data-expanded');
        });
    };

    const collapseOtherCards = (activeCard) => {
      cards.forEach((card) => {
        if (card !== activeCard) {
          card.removeAttribute('data-expanded');
        }
      });
    };

    const toggleCardExpansion = (card) => {
      if (card.hidden) {
        return;
      }

      const isExpanded = card.hasAttribute('data-expanded');
      collapseOtherCards(card);

      if (isExpanded) {
        card.removeAttribute('data-expanded');
      } else {
        card.setAttribute('data-expanded', 'true');
      }
    };

    cards.forEach((card) => {
      card.addEventListener('click', () => toggleCardExpansion(card));

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleCardExpansion(card);
        }
      });

      if (hoverMediaQuery.matches) {
        card.addEventListener('mouseleave', () => {
          card.removeAttribute('data-expanded');
        });
        card.addEventListener(
          'blur',
          (event) => {
            if (!card.contains(event.relatedTarget)) {
              card.removeAttribute('data-expanded');
            }
          },
          true
        );
      }
    });

    clampVisibleCards();
    section.dataset.teamInitialized = 'true';
  });
};

document.addEventListener('DOMContentLoaded', initTeamSections);
document.addEventListener('partialsLoaded', initTeamSections);
