export class HeaderService {
    public static readonly Instance = new HeaderService();

    public title = $state('');

    public setTitle(title: string) {
        this.title = title;        
    }

    public getTitle() {
        return this.title;
    }
}