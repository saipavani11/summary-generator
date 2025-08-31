import { useState, useEffect } from 'react';
import nspell from 'nspell';

export function useSpellChecker() {
  const [spell, setSpell] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function loadDictionary() {
      const aff = await fetch('/src/assets/dictionary/index.aff').then((res) => res.text());
      const dic = await fetch('/src/assets/dictionary/index.dic').then((res) => res.text());
      const spellInstance = nspell(aff, dic);
      setSpell(spellInstance);
    }

    loadDictionary();
  }, []);

  const checkWord = (word) => {
    if (spell && !spell.correct(word)) {
      setSuggestions(spell.suggest(word));
    } else {
      setSuggestions([]);
    }
  };

  return { checkWord, suggestions };
}
