<?php

class Container {

    protected $bindings = [];

    public function bind($key, $resolveCallback)
    {
        $this->bindings[$key] = $resolveCallback;
    }


    public function resolve($key)
    {
        if (!array_key_exists($key, $this->bindings)) {
            throw new Exception("No matching binding for {$key}");
        }

        return call_user_func($this->bindings[$key]);
    }
}