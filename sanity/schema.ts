import post from './schemas/post';
import author from './schemas/author';
import HTMLEmbed from './schemas/HTMLEmbed';
import affiliateProduct from './schemas/affiliateProduct';
import tutorial from './schemas/tutorial';

export const schema = {
  types: [post, author, HTMLEmbed, affiliateProduct, tutorial],
};
