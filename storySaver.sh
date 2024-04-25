### ### ### ### ### ####
#  storySaver startup  #
### ### ### ### ### ####

## create new panes
tmux rename-window 'storySaver';
tmux split-window -h -p 33
tmux split-window -v -t 1 -p 50;
tmux split-window -v -t 1 -p 50;

## shell (-t 0)
# tmux send-keys -t 0 'code . & clear' Enter; # open vscode
tmux send-keys -t 0 'hx .' Enter; # open helix

## typescript watcher (-t 1)
tmux send-keys -t 1 'npm run watch' Enter;

## application (-t 2)
tmux send-keys -t 2 'npm run core' Enter;

## focus shell
tmux select-pane -t 0
