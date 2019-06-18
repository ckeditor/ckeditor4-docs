<?php
// allow POST with imgs param only
if ( $_SERVER[ 'REQUEST_METHOD' ] !== 'POST' || empty( $_POST[ 'imgs' ] ) ) {
    exit();
}

// standard breakpoints
$breakpoints = [
    360,
    375,
    768,
    1920,
    2880
];

function calculateBreakpoints( $width, $breakpoints ) {
    if ( $width === 'default' ) {
        return [ 'default' ];
    }
    $calculated = [];
    foreach ( $breakpoints as $breakpoint ) {
        if ( $width < $breakpoint ) {
            $calculated[] = $breakpoint;
        }
    }
    return $calculated;
}

$imgs = json_decode( $_POST[ 'imgs' ] );

function getWidthOfImage($imgURL, $imgs) {
    foreach($imgs as $width => $url) {
        if($imgURL == $url) {
            return $width;
        }
    }
}

function getImageType( $mime ) {
    return strtoupper( explode( '/', isset( $mime ) ? $mime : '' )[ 1 ] );
}

$multiInit = curl_multi_init();
$options = array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_NOBODY => true,
    CURLOPT_CUSTOMREQUEST => "HEAD",
    CURLOPT_MAXREDIRS => 5);

foreach ($imgs as $width => $url) {
    if ( strpos( $url, 'https://33333.cdn.cke-cs.com/' ) !== 0 ) {
        continue;
    }
    $ch = curl_init();
    $options[CURLOPT_URL] = $url;
    curl_setopt_array($ch,$options);
    curl_multi_add_handle($multiInit, $ch);
}

// download sizes & prepare [URL => size] array
$return = [];
do {
    while(($currentExecRun = curl_multi_exec($multiInit, $stillRunning)) == CURLM_CALL_MULTI_PERFORM);
    if($currentExecRun != CURLM_OK)
        break;

    while($multiResponse = curl_multi_info_read($multiInit)) {
        $info = curl_getinfo($multiResponse['handle']);
        if ($info['http_code'] == 200)  {
            $return[$info['url']] = array(
                'size' => $info['download_content_length']>0 ? $info['download_content_length'] : 0,
                'type' => getImageType( $info['content_type'] )
            );
            $ch = curl_init();
            $options[CURLOPT_URL] = next($imgs);//it should take next url by prev url
            curl_setopt_array($ch,$options);
            curl_multi_add_handle($multiInit, $ch);
            curl_multi_remove_handle($multiInit, $multiResponse['handle']);
        } else {
            $return[$info['url']] = array('error' => $info['http_code']);
        }
    }
} while ($stillRunning);

curl_multi_close($multiInit);

//return all $imgs with additional info downloaded via curl
$returnOutput = [];
foreach ( $imgs as $width => $img ) {
    if ( !isset($return[$img]) ) {
        continue;
    }
    $info = [
        'image' => $img,
        'width' => $width,
        'size' => isset($return[$img]['size']) ? $return[$img]['size'] : 0,
        'type' => isset($return[$img]['type']) ? $return[$img]['type'] : null,
    ];
    if(isset($return[$img]['error'])){
        $info['error'] = $return[$img]['error'];
    }
    foreach( calculateBreakpoints($width, $breakpoints) as $breakpoint ) {
        $returnOutput[ $breakpoint ] = $info;
    }
}

echo json_encode( $returnOutput );
