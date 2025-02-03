#!/bin/bash

### ### ### ### ### ####
##  geoText startup  ###
### ### ### ### ### ####

## create layout
tmux rename-window 'geoText';
tmux split-window -h;
tmux split-window -v -t 1;
tmux split-window -h -t 1;
tmux split-window -h -t 3;

## run app
tmux send-keys -t 0 'hx .' Enter; # editor
tmux send-keys -t 1 'npm run server' Enter; # server
tmux send-keys -t 2 'npm run client' Enter; # web bundler
tmux send-keys -t 3 'npm run watch' Enter; # typescript watcher

## focus
tmux select-pane -t 0;
