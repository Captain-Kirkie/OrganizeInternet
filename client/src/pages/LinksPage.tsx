import type { FormEvent } from "react";
import { LinkList } from "../components/LinkList";

export function LinksPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("handling submit!!  Save the link here!!  ")
  }

  return (
    <main>
      <h1>Links</h1>

      <LinkList links={[]} />

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
