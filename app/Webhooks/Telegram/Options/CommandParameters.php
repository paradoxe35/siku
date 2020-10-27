<?php

namespace App\Webhooks\Telegram\Options;

use Illuminate\Support\Str;
use Spatie\Emoji\Emoji;

/**
 * 
 */
trait CommandParameters
{

    /**
     * @return array
     */
    public function parseParamCmd()
    {
        $text = $this->getUpdate()->getMessage()->get('text');

        return explode(' ', $text);
    }


    /**
     * Preprend warning emoji to text
     * 
     * @param string $text
     * 
     * @return string
     */
    public function warningText(string $text)
    {
        return Emoji::CHARACTER_WARNING . " $text";
    }

    /**
     * get command parameter or argumater
     * 
     * @param string|int $key
     * @param mixed $default
     * 
     * @return string
     */
    public function getParamCmd($key, $default = null)
    {
        $params = $this->parseParamCmd();

        if (is_int($key)) {
            return isset($params[$key + 1]) ? $params[$key + 1] : $default;
        }

        $regle = strtolower($key) . ':';

        $collect = collect($params)
            ->filter(fn ($v)  => Str::startsWith($v, $regle))
            ->map(fn ($v) => trim(Str::of($v)->after($regle)))
            ->values();

        return $collect->isNotEmpty() ? $collect->toArray()[0] : $default;
    }


    /**
     * @return int
     */
    public function chatId()
    {
        return $this->getUpdate()->getChat()->id;
    }

    /**
     * @return bool
     */
    public function isPrivate()
    {
        $isPrivate = $this->getUpdate()->getChat()->type == 'private';

        if (!$isPrivate) {
            $this->replyWithMessage(['text' => "This command must be in private discussion"]);
            exit;
        }
    }
}
