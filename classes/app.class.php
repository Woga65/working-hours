<?php

class App {

    protected static $container;


    public static function setContainer($container)
    {
        static::$container = $container;
    }


    public static function container()
    {
        return static::$container;
    }


    public static function bind($key, $resolveCallback)
    {
        return static::container()->bind($key, $resolveCallback);
    }


    public static function resolve($key)
    {
        return static::container()->resolve($key);
    }

}