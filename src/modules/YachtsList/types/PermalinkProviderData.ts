export default interface PermalinkProviderData<T = string> {
    filterName: string;
    defaultValue: T;
    changeCallback: (changedValue: T) => void;
}