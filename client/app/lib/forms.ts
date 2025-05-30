import type { FormEvent } from "react";

export function PrepareForm(e: FormEvent): Record<string, string> {
    const output = {}

    let form = e.target
    // @ts-expect-error
    if (e.target.form) form = e.target.form

    // @ts-expect-error
    for (let i = 0; i < form.length; i++) {
        // @ts-expect-error
        if (form[i].id == "") continue;

        // @ts-expect-error
        output[form[i].id] = form[i].value
    }

    return output
}