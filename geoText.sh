### ### ### ### ### ####
#   geoText startup    #
### ### ### ### ### ####

## create new panes
tmux rename-window 'geoText';
tmux split-window -h -l 33%;
tmux split-window -v -t 1;
tmux split-window -v -t 1;

## shell (-t 0)
# tmux send-keys -t 0 'code . & clear' Enter; # open vscode
tmux send-keys -t 0 'hx .' Enter; # open helix

## typescript watcher (-t 1)
tmux send-keys -t 1 'npm run watch' Enter;

## application (-t 2)
tmux send-keys -t 2 'npm run core' Enter;

## focus shell
tmux select-pane -t 0
