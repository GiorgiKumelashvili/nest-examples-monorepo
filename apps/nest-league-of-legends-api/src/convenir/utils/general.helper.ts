import { GenHelper } from '../../shared/general.helpers';

export class GeneralHelper {
    private static static_link = GenHelper.STATIC_LINK;

    public static staticLolAssets(type: 'profileIcon' | 'championIcon' | 'tierEmblem', item: string) {
        switch (type) {
            case 'profileIcon':
                return `${this.static_link}/11.24.1/img/profileicon/${item}.png`;
            case 'championIcon':
                return `${this.static_link}/11.24.1/img/champion/${item}.png`;
            case 'tierEmblem':
                return `${this.static_link}/ranked-emblems/Emblem_${this.uppercaseOnlyFirst(item as string)}.png`;
            default:
                return null;
        }
    }

    private static uppercaseOnlyFirst(item: string) {
        return item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
    }
}
