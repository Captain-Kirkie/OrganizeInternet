import type { FormEvent } from "react";

export function LinksPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main>
      <h1>Links</h1>
      <form onSubmit={handleSubmit}>
        <label>
          URL
          <input name="url" type="url" />
        </label>
        <label>
          Title
          <input name="title" type="text" />
        </label>
        <button type="submit">Save</button>
      </form>
      <ul aria-label="Saved links" />
    </main>
  );
}
