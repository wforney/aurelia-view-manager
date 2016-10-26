import { ResolvedViewStrategy } from './../resolved-view-strategy';
import { useViewStrategy } from 'aurelia-templating';
export function resolvedView(namespace, view) {
    return useViewStrategy(new ResolvedViewStrategy(namespace, view));
}
