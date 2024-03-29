<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages =  [
             ['name' => 'English', 'code' => 'en' ],
             ['name' => 'Afar', 'code' => 'aa' ],
             ['name' => 'Abkhazian', 'code' => 'ab' ],
             ['name' => 'Afrikaans', 'code' => 'af' ],
             ['name' => 'Amharic', 'code' => 'am' ],
             ['name' => 'Arabic', 'code' => 'ar' ],
             ['name' => 'Assamese', 'code' => 'as' ],
             ['name' => 'Aymara', 'code' => 'ay' ],
             ['name' => 'Azerbaijani', 'code' => 'az' ],
             ['name' => 'Bashkir', 'code' => 'ba' ],
             ['name' => 'Belarusian', 'code' => 'be' ],
             ['name' => 'Bulgarian', 'code' => 'bg' ],
             ['name' => 'Bihari', 'code' => 'bh' ],
             ['name' => 'Bislama', 'code' => 'bi' ],
             ['name' => 'Bengali/Bangla', 'code' => 'bn' ],
             ['name' => 'Tibetan', 'code' => 'bo' ],
             ['name' => 'Breton', 'code' => 'br' ],
             ['name' => 'Catalan', 'code' => 'ca' ],
             ['name' => 'Corsican', 'code' => 'co' ],
             ['name' => 'Czech', 'code' => 'cs' ],
             ['name' => 'Welsh', 'code' => 'cy' ],
             ['name' => 'Danish', 'code' => 'da' ],
             ['name' => 'German', 'code' => 'de' ],
             ['name' => 'Bhutani', 'code' => 'dz' ],
             ['name' => 'Greek', 'code' => 'el' ],
             ['name' => 'Esperanto', 'code' => 'eo' ],
             ['name' => 'Spanish', 'code' => 'es' ],
             ['name' => 'Estonian', 'code' => 'et' ],
             ['name' => 'Basque', 'code' => 'eu' ],
             ['name' => 'Persian', 'code' => 'fa' ],
             ['name' => 'Finnish', 'code' => 'fi' ],
             ['name' => 'Fiji', 'code' => 'fj' ],
             ['name' => 'Faeroese', 'code' => 'fo' ],
             ['name' => 'French', 'code' => 'fr' ],
             ['name' => 'Frisian', 'code' => 'fy' ],
             ['name' => 'Irish', 'code' => 'ga' ],
             ['name' => 'Scots/Gaelic', 'code' => 'gd' ],
             ['name' => 'Galician', 'code' => 'gl' ],
             ['name' => 'Guarani', 'code' => 'gn' ],
             ['name' => 'Gujarati', 'code' => 'gu' ],
             ['name' => 'Hausa', 'code' => 'ha' ],
             ['name' => 'Hindi', 'code' => 'hi' ],
             ['name' => 'Croatian', 'code' => 'hr' ],
             ['name' => 'Hungarian', 'code' => 'hu' ],
             ['name' => 'Armenian', 'code' => 'hy' ],
             ['name' => 'Interlingua', 'code' => 'ia' ],
             ['name' => 'Interlingue', 'code' => 'ie' ],
             ['name' => 'Inupiak', 'code' => 'ik' ],
             ['name' => 'Indonesian', 'code' => 'in' ],
             ['name' => 'Icelandic', 'code' => 'is' ],
             ['name' => 'Italian', 'code' => 'it' ],
             ['name' => 'Hebrew', 'code' => 'iw' ],
             ['name' => 'Japanese', 'code' => 'ja' ],
             ['name' => 'Yiddish', 'code' => 'ji' ],
             ['name' => 'Javanese', 'code' => 'jw' ],
             ['name' => 'Georgian', 'code' => 'ka' ],
             ['name' => 'Kazakh', 'code' => 'kk' ],
             ['name' => 'Greenlandic', 'code' => 'kl' ],
             ['name' => 'Cambodian', 'code' => 'km' ],
             ['name' => 'Kannada', 'code' => 'kn' ],
             ['name' => 'Korean', 'code' => 'ko' ],
             ['name' => 'Kashmiri', 'code' => 'ks' ],
             ['name' => 'Kurdish', 'code' => 'ku' ],
             ['name' => 'Kirghiz', 'code' => 'ky' ],
             ['name' => 'Latin', 'code' => 'la' ],
             ['name' => 'Lingala', 'code' => 'ln' ],
             ['name' => 'Laothian', 'code' => 'lo' ],
             ['name' => 'Lithuanian', 'code' => 'lt' ],
             ['name' => 'Latvian/Lettish', 'code' => 'lv' ],
             ['name' => 'Malagasy', 'code' => 'mg' ],
             ['name' => 'Maori', 'code' => 'mi' ],
             ['name' => 'Macedonian', 'code' => 'mk' ],
             ['name' => 'Malayalam', 'code' => 'ml' ],
             ['name' => 'Mongolian', 'code' => 'mn' ],
             ['name' => 'Moldavian', 'code' => 'mo' ],
             ['name' => 'Marathi', 'code' => 'mr' ],
             ['name' => 'Malay', 'code' => 'ms' ],
             ['name' => 'Maltese', 'code' => 'mt' ],
             ['name' => 'Burmese', 'code' => 'my' ],
             ['name' => 'Nauru', 'code' => 'na' ],
             ['name' => 'Nepali', 'code' => 'ne' ],
             ['name' => 'Dutch', 'code' => 'nl' ],
             ['name' => 'Norwegian', 'code' => 'no' ],
             ['name' => 'Occitan', 'code' => 'oc' ],
             ['name' => '[Afan ]/Oromoor/Oriya', 'code' => 'om' ],
             ['name' => 'Punjabi', 'code' => 'pa' ],
             ['name' => 'Polish', 'code' => 'pl' ],
             ['name' => 'Pashto/Pushto', 'code' => 'ps' ],
             ['name' => 'Portuguese', 'code' => 'pt' ],
             ['name' => 'Quechua', 'code' => 'qu' ],
             ['name' => 'Rhaeto-Romance', 'code' => 'rm' ],
             ['name' => 'Kirundi', 'code' => 'rn' ],
             ['name' => 'Romanian', 'code' => 'ro' ],
             ['name' => 'Russian', 'code' => 'ru' ],
             ['name' => 'Kinyarwanda', 'code' => 'rw' ],
             ['name' => 'Sanskrit', 'code' => 'sa' ],
             ['name' => 'Sindhi', 'code' => 'sd' ],
             ['name' => 'Sangro', 'code' => 'sg' ],
             ['name' => 'Serbo-Croatian', 'code' => 'sh' ],
             ['name' => 'Singhalese', 'code' => 'si' ],
             ['name' => 'Slovak', 'code' => 'sk' ],
             ['name' => 'Slovenian', 'code' => 'sl' ],
             ['name' => 'Samoan', 'code' => 'sm' ],
             ['name' => 'Shona', 'code' => 'sn' ],
             ['name' => 'Somali', 'code' => 'so' ],
             ['name' => 'Albanian', 'code' => 'sq' ],
             ['name' => 'Serbian', 'code' => 'sr' ],
             ['name' => 'Siswati', 'code' => 'ss' ],
             ['name' => 'Sesotho', 'code' => 'st' ],
             ['name' => 'Sundanese', 'code' => 'su' ],
             ['name' => 'Swedish', 'code' => 'sv' ],
             ['name' => 'Swahili', 'code' => 'sw' ],
             ['name' => 'Tamil', 'code' => 'ta' ],
             ['name' => 'Telugu', 'code' => 'te' ],
             ['name' => 'Tajik', 'code' => 'tg' ],
             ['name' => 'Thai', 'code' => 'th' ],
             ['name' => 'Tigrinya', 'code' => 'ti' ],
             ['name' => 'Turkmen', 'code' => 'tk' ],
             ['name' => 'Tagalog', 'code' => 'tl' ],
             ['name' => 'Setswana', 'code' => 'tn' ],
             ['name' => 'Tonga', 'code' => 'to' ],
             ['name' => 'Turkish', 'code' => 'tr' ],
             ['name' => 'Tsonga', 'code' => 'ts' ],
             ['name' => 'Tatar', 'code' => 'tt' ],
             ['name' => 'Twi', 'code' => 'tw' ],
             ['name' => 'Ukrainian', 'code' => 'uk' ],
             ['name' => 'Urdu', 'code' => 'ur' ],
             ['name' => 'Uzbek', 'code' => 'uz' ],
             ['name' => 'Vietnamese', 'code' => 'vi' ],
             ['name' => 'Volapuk', 'code' => 'vo' ],
             ['name' => 'Wolof', 'code' => 'wo' ],
             ['name' => 'Xhosa', 'code' => 'xh' ],
             ['name' => 'Yoruba', 'code' => 'yo' ],
             ['name' => 'Chinese', 'code' => 'zh' ],
             ['name' => 'Zulu', 'code' => 'zu' ],

         ];

         foreach ($languages as $value) {
            Language::create($value);
        }
    }
}
